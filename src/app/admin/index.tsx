import React from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import { dashboardStyles as styles } from "../../styles/admin/dashboard.styles";

export default function Dashboard() {

  const totalSales = "8,450.00";
  const totalOrders = 42;
  const averageOrderValue = "201.19";
  const activeMenuItems = 18;
  const totalMenuItems = 22;


  const salesData = [
    { hour: "8AM", amount: 450 },
    { hour: "9AM", amount: 620 },
    { hour: "10AM", amount: 480 },
    { hour: "11AM", amount: 850 },
    { hour: "12PM", amount: 1250 },
    { hour: "1PM", amount: 980 },
    { hour: "2PM", amount: 720 },
    { hour: "3PM", amount: 540 },
  ];

  const maxSale = Math.max(
    ...salesData.map((item) => item.amount)
  );

  const bestSellingItems = [
    {
      name: "Chicken Adobo",
      quantity: 32,
      total: "2,240.00",
    },
    {
      name: "Pork Sinigang",
      quantity: 27,
      total: "2,025.00",
    },
    {
      name: "Fried Chicken",
      quantity: 21,
      total: "1,680.00",
    },
    {
      name: "Pancit Canton",
      quantity: 18,
      total: "900.00",
    },
    {
      name: "Beef Steak",
      quantity: 14,
      total: "1,120.00",
    },
  ];


  const recentOrders = [
    {
      number: "#ORD-001",
      time: "12:42 PM",
      items: "Chicken Adobo, Rice",
      total: "95.00",
      staff: "Maria",
      status: "Completed",
    },
    {
      number: "#ORD-002",
      time: "12:35 PM",
      items: "Pork Sinigang, Rice",
      total: "110.00",
      staff: "John",
      status: "Completed",
    },
    {
      number: "#ORD-003",
      time: "12:21 PM",
      items: "Fried Chicken, Rice",
      total: "100.00",
      staff: "Maria",
      status: "Pending",
    },
    {
      number: "#ORD-004",
      time: "12:10 PM",
      items: "Pancit Canton",
      total: "50.00",
      staff: "John",
      status: "Completed",
    },
  ];

  return (
    <View style={styles.container}>


      <AdminSidebar />

      <View style={styles.main}>

        {/* HEADER */}

        <AdminHeader role="Administrator" />


        {/* DASHBOARD CONTENT */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >


          <View style={styles.cardsContainer}>

            {/* TODAY'S SALES */}

            <View style={styles.card}>

              <View style={styles.cardTop}>

                <Text style={styles.cardLabel}>
                  Today's Sales
                </Text>

                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    ₱
                  </Text>
                </View>

              </View>

              <Text style={styles.cardValue}>
                ₱{totalSales}
              </Text>

              <Text style={styles.cardDescription}>
                As of today
              </Text>

            </View>


            {/* ORDERS */}

            <View style={styles.card}>

              <View style={styles.cardTop}>

                <Text style={styles.cardLabel}>
                  Orders Today
                </Text>

                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    #
                  </Text>
                </View>

              </View>

              <Text style={styles.cardValue}>
                {totalOrders}
              </Text>

              <Text style={styles.cardDescription}>
                Completed orders
              </Text>

            </View>


            {/* AVERAGE ORDER */}

            <View style={styles.card}>

              <View style={styles.cardTop}>

                <Text style={styles.cardLabel}>
                  Average Order Value
                </Text>

                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    ₱
                  </Text>
                </View>

              </View>

              <Text style={styles.cardValue}>
                ₱{averageOrderValue}
              </Text>

              <Text style={styles.cardDescription}>
                Per transaction
              </Text>

            </View>


            {/* MENU ITEMS */}

            <View style={styles.card}>

              <View style={styles.cardTop}>

                <Text style={styles.cardLabel}>
                  Menu Items
                </Text>

                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>
                    ☰
                  </Text>
                </View>

              </View>

              <Text style={styles.cardValue}>
                {activeMenuItems}
              </Text>

              <Text style={styles.cardDescription}>
                of {totalMenuItems} total
              </Text>

            </View>

          </View>



          <View style={styles.analyticsRow}>

            {/* SALES CHART */}

            <View style={styles.salesSection}>

              <Text style={styles.sectionTitle}>
                Sales Today
              </Text>

              <Text style={styles.sectionSubtitle}>
                Sales by hour
              </Text>


              <View style={styles.chartArea}>

                {/* Y AXIS */}

                <View style={styles.yAxis}>

                  <Text style={styles.axisText}>
                    ₱1,500
                  </Text>

                  <Text style={styles.axisText}>
                    ₱1,000
                  </Text>

                  <Text style={styles.axisText}>
                    ₱500
                  </Text>

                  <Text style={styles.axisText}>
                    ₱0
                  </Text>

                </View>


                {/* BARS */}

                <View style={styles.barsArea}>

                  {salesData.map((item) => {

                    const barHeight =
                      (item.amount / maxSale) * 180;

                    return (
                      <View
                        key={item.hour}
                        style={styles.barWrapper}
                      >

                        <View
                          style={[
                            styles.bar,
                            {
                              height: barHeight,
                            },
                          ]}
                        />

                        <Text style={styles.barLabel}>
                          {item.hour}
                        </Text>

                      </View>
                    );

                  })}

                </View>

              </View>

            </View>


            {/* BEST SELLING */}

            <View style={styles.bestSellingSection}>

              <Text style={styles.sectionTitle}>
                Best-Selling Items
              </Text>

              <Text style={styles.sectionSubtitle}>
                Highest to lowest
              </Text>


              <View style={styles.bestSellingList}>

                {bestSellingItems.map(
                  (item, index) => (

                    <View
                      key={item.name}
                      style={styles.bestSellingItem}
                    >

                      {/* RANK */}

                      <View style={styles.rank}>

                        <Text style={styles.rankText}>
                          {index + 1}
                        </Text>

                      </View>


                      {/* ITEM */}

                      <View style={styles.itemInfo}>

                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>

                        <Text style={styles.itemQuantity}>
                          {item.quantity} sold
                        </Text>

                      </View>


                      {/* SALES */}

                      <Text style={styles.itemTotal}>
                        ₱{item.total}
                      </Text>

                    </View>

                  )
                )}

              </View>

            </View>

          </View>


          <View style={styles.ordersSection}>

            {/* HEADER */}

            <View style={styles.ordersHeader}>

              <View>

                <Text style={styles.sectionTitle}>
                  Recent Orders
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Latest transactions
                </Text>

              </View>

            </View>


            {/* TABLE HEADER */}

            <View style={styles.tableHeader}>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.orderColumn,
                ]}
              >
                Order No.
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.timeColumn,
                ]}
              >
                Time
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.itemsColumn,
                ]}
              >
                Items
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.totalColumn,
                ]}
              >
                Total
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.staffColumn,
                ]}
              >
                Staff
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  styles.statusColumn,
                ]}
              >
                Status
              </Text>

            </View>


            {/* TABLE ROWS */}

            {recentOrders.map((order) => (

              <View
                key={order.number}
                style={styles.tableRow}
              >

                <Text
                  style={[
                    styles.tableText,
                    styles.orderColumn,
                  ]}
                >
                  {order.number}
                </Text>


                <Text
                  style={[
                    styles.tableText,
                    styles.timeColumn,
                  ]}
                >
                  {order.time}
                </Text>


                <Text
                  style={[
                    styles.tableText,
                    styles.itemsColumn,
                  ]}
                  numberOfLines={1}
                >
                  {order.items}
                </Text>


                <Text
                  style={[
                    styles.tableText,
                    styles.totalColumn,
                  ]}
                >
                  ₱{order.total}
                </Text>


                <Text
                  style={[
                    styles.tableText,
                    styles.staffColumn,
                  ]}
                >
                  {order.staff}
                </Text>


                <View style={styles.statusColumn}>

                  <Text
                    style={
                      order.status === "Completed"
                        ? styles.completedStatus
                        : styles.pendingStatus
                    }
                  >
                    {order.status}
                  </Text>

                </View>

              </View>

            ))}

          </View>

        </ScrollView>

      </View>

    </View>
  );
}