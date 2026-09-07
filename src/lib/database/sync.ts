import NetInfo from "@react-native-community/netinfo";

export async function syncData() {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    console.log("Offline - skipping sync");
    return;
  }

  console.log("Starting sync...");

  // 1. sync orders
  // 2. sync order_items
  // 3. sync sales
  // 4. sync categories
  // 5. sync menu
  // 6. sync settings

  console.log("Sync complete");
}