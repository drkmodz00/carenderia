import React, { useEffect, useMemo, useState } from "react";
import {ActivityIndicator,Alert,FlatList,Image,Modal,Pressable,  ScrollView,  Text,  TextInput,  View,  useWindowDimensions,} from "react-native";
  
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import AdminBottomNav from "@/components/admin/AdminBottomNav";

import AddMenuModal, {  AddMenuData, } from "@/components/admin/modals/menu_crud/AddMenuModal";
import EditMenuModal, {  EditMenuData, } from "@/components/admin/modals/menu_crud/EditMenuModal";
import DeleteMenuModal from "@/components/admin/modals/menu_crud/DeleteMenuModal";

import { menuStyles as styles } from "@/styles/admin/menu.styles";
import { COLORS } from "@/styles/admin/theme";

import { addMenuItem, deleteMenuItem, getMenuItems, MenuItem, toggleMenuItem, updateMenuItem, } from "@/lib/menu";
import { getCategories } from "@/lib/category";

import { getPaymentSettings,  PaymentSettings, removePaymentQr, savePaymentSettings, } from "@/lib/paymentSetting";

export default function MenuManagement() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const pad = isTablet ? 24 : 16;

  const headerDateLabel = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [deleteBlockedReason, setDeleteBlockedReason] =
    useState<string | null>(null);

  const [paymentSettings, setPaymentSettings] =
    useState<PaymentSettings | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const [localQrUri, setLocalQrUri] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory),
    [menuItems, selectedCategory]
  );

  async function loadMenu() {
    try {
      setLoading(true);

      const [menuData, categoryData, paymentData] = await Promise.all([
        getMenuItems(),
        getCategories(),
        getPaymentSettings(),
      ]);

      setMenuItems(menuData);
      setCategories(categoryData.map((category) => category.name));
      setPaymentSettings(paymentData);
    } catch (error) {
      console.error("Failed to load menu:", error);

      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unable to load menu."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  async function handleAdd(data: AddMenuData) {
    try {
      setSaving(true);

      const item = await addMenuItem(
        data.name.trim(),
        data.price,
        data.category.trim(),
        data.image?.trim() || null
      );

      setMenuItems((items) => [...items, item]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add menu item:", error);

      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unable to add menu item."
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit(data: EditMenuData) {
    if (!editingItem) return;

    const name = data.name.trim();
    const price = Number(data.price);
    const category = data.category.trim();
    const image = data.image?.trim() || null;

    if (!name) {
      Alert.alert("Invalid", "Please enter a menu name.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      Alert.alert("Invalid", "Please enter a valid price.");
      return;
    }

    if (!category) {
      Alert.alert("Invalid", "Please select a category.");
      return;
    }

    try {
      setSaving(true);

      const updated = await updateMenuItem(
        editingItem.id,
        name,
        price,
        category,
        image
      );

      setMenuItems((items) =>
        items.map((item) =>
          item.id === editingItem.id ? updated : item
        )
      );

      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update menu:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to update menu item."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(item: MenuItem) {
    if (saving) return;

    try {
      setSaving(true);

      const updated = await toggleMenuItem(
        item.id,
        !item.available
      );

      setMenuItems((items) =>
        items.map((current) =>
          current.id === item.id ? updated : current
        )
      );
    } catch (error) {
      console.error("Toggle error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to update availability."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(item: MenuItem) {
    if (saving) return;

    setDeleteBlockedReason(null);
    setItemToDelete(item);
  }

  async function confirmDelete() {
    if (!itemToDelete) return;

    try {
      setSaving(true);

      await deleteMenuItem(itemToDelete.id);

      setMenuItems((items) =>
        items.filter(
          (current) => current.id !== itemToDelete.id
        )
      );

      if (editingItem?.id === itemToDelete.id) {
        setEditingItem(null);
      }

      setItemToDelete(null);
      setDeleteBlockedReason(null);
    } catch (error) {
      console.error("Delete error:", error);

      const isForeignKeyViolation =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "23503";

      if (isForeignKeyViolation) {
        setDeleteBlockedReason(
          `"${itemToDelete.name}" is part of one or more past orders, so it can't be deleted. You can mark it unavailable instead to hide it from customers while keeping order history intact.`
        );
      } else {
        Alert.alert(
          "Error",
          error instanceof Error
            ? error.message
            : "Unable to delete item."
        );

        setItemToDelete(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function markUnavailableFromDeleteModal() {
    if (!itemToDelete) return;

    try {
      setSaving(true);

      const updated = await toggleMenuItem(
        itemToDelete.id,
        false
      );

      setMenuItems((items) =>
        items.map((current) =>
          current.id === itemToDelete.id ? updated : current
        )
      );

      setItemToDelete(null);
      setDeleteBlockedReason(null);
    } catch (error) {
      console.error("Toggle error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to update availability."
      );
    } finally {
      setSaving(false);
    }
  }

  function openPaymentModal() {
    setLocalQrUri(null);
    setAccountName(paymentSettings?.account_name || "");
    setShowPaymentModal(true);
  }

  async function handlePickQrImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow photo library access to select your GCash QR."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setLocalQrUri(result.assets[0].uri);
    }
  }

  async function handleSavePayment() {
    if (!accountName.trim()) {
      Alert.alert(
        "Invalid",
        "Please enter the GCash account name."
      );
      return;
    }

    try {
      setSavingPayment(true);

      const updated = await savePaymentSettings({
        qrImageUri: localQrUri,
        accountName: accountName.trim(),
      });

      setPaymentSettings(updated);
      setLocalQrUri(null);
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Failed to save GCash settings:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to save GCash settings."
      );
    } finally {
      setSavingPayment(false);
    }
  }

  async function handleRemoveQr() {
    try {
      setSavingPayment(true);

      const updated = await removePaymentQr();

      setPaymentSettings(updated);
      setLocalQrUri(null);
    } catch (error) {
      console.error("Failed to remove GCash QR:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Unable to remove GCash QR."
      );
    } finally {
      setSavingPayment(false);
    }
  }

  const qrPreviewUri =
    localQrUri || paymentSettings?.qr_image_url || null;

  function renderItem({ item }: { item: MenuItem }) {
    const imageSource = item.image_url || item.icon || null;

    return (
      <View
        style={[
          styles.card,
          !item.available && styles.cardUnavailable,
        ]}
      >
        <View style={styles.thumbWrap}>
          {imageSource ? (
            <Image
              source={{ uri: imageSource }}
              style={styles.thumb}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.thumbFallback}>
              <Text style={styles.thumbFallbackIcon}>
                🍽️
              </Text>
            </View>
          )}

          {!item.available && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableBadgeText}>
                Sold out
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <Text
              style={[
                styles.itemName,
                !item.available && styles.textMuted,
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <Pressable
              style={[
                styles.toggle,
                item.available
                  ? styles.toggleOn
                  : styles.toggleOff,
              ]}
              onPress={() => handleToggle(item)}
              disabled={saving}
            >
              <View
                style={[
                  styles.toggleKnob,
                  item.available
                    ? styles.toggleKnobOn
                    : styles.toggleKnobOff,
                ]}
              />
            </Pressable>
          </View>

          <View style={styles.categoryPill}>
            <Text
              style={styles.categoryPillText}
              numberOfLines={1}
            >
              {item.category}
            </Text>
          </View>

          <View style={styles.cardBottomRow}>
            <Text
              style={[
                styles.itemPrice,
                !item.available && styles.textMuted,
              ]}
            >
              ₱{Number(item.price).toFixed(2)}
            </Text>

            <View style={styles.cardActions}>
              <Pressable
                style={styles.iconButton}
                onPress={() => setEditingItem(item)}
                disabled={saving}
              >
                <Text style={styles.iconButtonText}>
                  ✎
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.iconButton,
                  styles.iconButtonDanger,
                ]}
                onPress={() => handleDelete(item)}
                disabled={saving}
              >
                <Text style={styles.iconButtonDangerText}>
                  🗑
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />

        <Text style={styles.loadingText}>
          Loading menu...
        </Text>

        <AdminBottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: pad,
            paddingTop:
              (isTablet ? 18 : 14) + insets.top,
          },
        ]}
      >
        <View>
          <Text style={styles.headerTitle}>
            Menu
          </Text>

          <Text style={styles.headerDate}>
            {headerDateLabel}
          </Text>
        </View>

        <Pressable
          onPress={loadMenu}
          style={({ pressed }) => [
            styles.refreshButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons
            name="refresh"
            size={19}
            color={COLORS.text}
          />

          <Text style={styles.refreshText}>
            Refresh
          </Text>
        </Pressable>
      </View>

      {/* GCash */}
      <Pressable
        style={styles.paymentQrRow}
        onPress={openPaymentModal}
      >
        <View style={styles.paymentQrThumbWrap}>
          {paymentSettings?.qr_image_url ? (
            <Image
              source={{
                uri: paymentSettings.qr_image_url,
              }}
              style={styles.paymentQrThumb}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.paymentQrThumbIcon}>
              ▦
            </Text>
          )}
        </View>

        <View style={styles.paymentQrInfo}>
          <Text style={styles.paymentQrTitle}>
            GCash QR
          </Text>

          <Text
            style={styles.paymentQrSubtitle}
            numberOfLines={1}
          >
            {paymentSettings?.qr_image_url
              ? paymentSettings.account_name ||
                "GCash account name not set"
              : "Not set up yet — tap to add"}
          </Text>
        </View>

        <Text style={styles.paymentQrChevron}>
          ›
        </Text>
      </Pressable>

      {/* Add Menu Modal */}
      <AddMenuModal
        visible={showAddModal}
        categories={categories}
        onClose={() => setShowAddModal(false)}
        onSave={handleAdd}
        saving={saving}
      />

      {/* Edit Menu Modal */}
      <EditMenuModal
        visible={editingItem !== null}
        item={editingItem}
        categories={categories}
        onClose={() => {
          if (!saving) setEditingItem(null);
        }}
        onSave={saveEdit}
        saving={saving}
      />

      {/* Delete Menu Modal */}
      <DeleteMenuModal
        visible={itemToDelete !== null}
        item={itemToDelete}
        saving={saving}
        blockedReason={deleteBlockedReason}
        onClose={() => {
          if (!saving) {
            setItemToDelete(null);
            setDeleteBlockedReason(null);
          }
        }}
        onConfirm={confirmDelete}
        onMarkUnavailable={
          markUnavailableFromDeleteModal
        }
      />

      {/* GCash Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          if (!savingPayment) {
            setShowPaymentModal(false);
          }
        }}
      >
        <View style={styles.paymentBackdrop}>
          <View style={styles.paymentSheet}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentTitle}>
                GCash Payment
              </Text>

              <Pressable
                onPress={() =>
                  setShowPaymentModal(false)
                }
                disabled={savingPayment}
                hitSlop={8}
              >
                <Text style={styles.paymentCloseIcon}>
                  ×
                </Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.paymentScrollContent
              }
            >
              <Text style={styles.paymentLabel}>
                GCash QR Code
              </Text>

              <Pressable
                style={styles.qrPickerBox}
                onPress={handlePickQrImage}
                disabled={savingPayment}
              >
                {qrPreviewUri ? (
                  <Image
                    source={{ uri: qrPreviewUri }}
                    style={styles.qrImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.qrEmpty}>
                    <Text style={styles.qrEmptyIcon}>
                      ▦
                    </Text>

                    <Text style={styles.qrEmptyText}>
                      Tap to upload GCash QR
                    </Text>
                  </View>
                )}
              </Pressable>

              <Text style={styles.paymentHint}>
                Upload the GCash QR code customers can
                scan when paying their order.
              </Text>

              <Text style={styles.paymentLabel}>
                GCash Account Name
              </Text>

              <TextInput
                style={styles.paymentInput}
                value={accountName}
                onChangeText={setAccountName}
                placeholder="e.g. Juan Dela Cruz"
                placeholderTextColor={COLORS.muted}
                autoCapitalize="words"
              />
            </ScrollView>

            <View style={styles.paymentActions}>
              {paymentSettings?.qr_image_url && (
                <Pressable
                  style={[
                    styles.paymentButton,
                    styles.removeButton,
                  ]}
                  onPress={handleRemoveQr}
                  disabled={savingPayment}
                >
                  <Text style={styles.removeButtonText}>
                    Remove QR
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={[
                  styles.paymentButton,
                  styles.saveButton,
                  (savingPayment ||
                    !accountName.trim()) &&
                    styles.saveButtonDisabled,
                ]}
                onPress={handleSavePayment}
                disabled={
                  savingPayment ||
                  !accountName.trim()
                }
              >
                {savingPayment ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.text}
                  />
                ) : (
                  <Text style={styles.saveButtonText}>
                    Save GCash Settings
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Categories */}
      <FlatList
        horizontal
        data={["All", ...categories]}
        keyExtractor={(category) => category}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.categoryListContent
        }
        style={styles.categoryList}
        renderItem={({ item: category }) => {
          const active =
            selectedCategory === category;

          return (
            <Pressable
              style={[
                styles.categoryButton,
                active &&
                  styles.categoryButtonActive,
              ]}
              onPress={() =>
                setSelectedCategory(category)
              }
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  active &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Menu */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={
          styles.menuListContent
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>
              🍽️
            </Text>

            <Text style={styles.emptyStateText}>
              Wala pang menu items.
            </Text>
          </View>
        }
      />

      {/* Floating Add Menu Button */}
      <Pressable
        style={[
          styles.fab,
          (saving || categories.length === 0) &&
            styles.fabDisabled,
        ]}
        onPress={() =>
          setShowAddModal(true)
        }
        disabled={
          saving || categories.length === 0
        }
        hitSlop={6}
      >
        <Text style={styles.fabIcon}>
          +
        </Text>
      </Pressable>

      <AdminBottomNav />
    </View>
  );
}