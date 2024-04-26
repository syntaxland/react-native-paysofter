import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, PieChart } from "react-native-chart-kit";
import { getUserTransactions } from "../../redux/actions/transactionActions";
import { getUserPayouts } from "../../redux/actions/payoutActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import Loader from "../Loader";
import Message from "../Message";
import GetNgnAccountFundBalance from "../FundAccount/GetNgnAccountFundBalance";
import GetUsdAccountFundBalance from "../FundAccount/GetUsdAccountFundBalance";
import SelectCurrency from "../settings/SelectCurrency";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserTransactions());
    dispatch(getUserPayouts());
  }, [dispatch]);

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userTransactions = useSelector((state) => state.userTransactions);
  const { loading: transactionLoading, error: transactionError, transactions } = userTransactions;

  const userPayouts = useSelector((state) => state.userPayouts);
  const { loading: payoutLoading, payouts, error: payoutError } = userPayouts;

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const { loading: creditPointBalanceLoading, error: creditPointBalanceError, creditPointBalance } = creditPointBal;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {creditPointBalanceLoading || transactionLoading || payoutLoading ? (
        <Loader />
      ) : creditPointBalanceError || transactionError || payoutError ? (
        <Message variant="danger">
          {creditPointBalanceError || transactionError || payoutError}
        </Message>
      ) : (
        <View style={styles.content}>
          <Text style={styles.heading}>Transactions</Text>
          <LineChart
            data={{
              labels: transactions.map((transaction) => transaction.timestamp),
              datasets: [
                {
                  data: transactions.map((transaction) => transaction.amount),
                },
              ],
            }}
            width={300}
            height={200}
            yAxisLabel="NGN"
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
          <GetNgnAccountFundBalance />
          <GetUsdAccountFundBalance />
          <SelectCurrency />
          <View style={styles.servicesContainer}>
            <Text style={styles.heading}>Services</Text>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Airtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Mobile Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>CableTV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Internet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Book Flight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>Gaming</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text>POS Terminal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pieChartsContainer}>
            <Text style={styles.heading}>Paysofter Promise</Text>
            <View style={styles.pieChartContainer}>
              <Text style={styles.subHeading}>Paid Promise Rate</Text>
              <PieChart
                data={[
                  {
                    name: "Paid Payouts",
                    population: payouts.filter((payout) => payout.is_paid).length,
                    color: "#1F77B4",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Unpaid Payouts",
                    population: payouts.filter((payout) => !payout.is_paid).length,
                    color: "#FF6384",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>
            <View style={styles.pieChartContainer}>
              <Text style={styles.subHeading}>Promise Approval Rate</Text>
              <PieChart
                data={[
                  {
                    name: "Delivered Payouts",
                    population: payouts.filter((payout) => payout.is_approved).length,
                    color: "#008000",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Undelivered Payouts",
                    population: payouts.filter((payout) => !payout.is_approved).length,
                    color: "#FFA500",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  content: {
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  servicesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  serviceButton: {
    backgroundColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  pieChartsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  pieChartContainer: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Dashboard;
