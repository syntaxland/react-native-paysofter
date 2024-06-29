// Webhooks.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { List, ActivityIndicator, Snackbar } from "react-native-paper";
import { Card } from "react-native-paper";

function Webhooks() {
  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.header}>
                <Text style={styles.icon}>{"\u{1F4BB}"}</Text> SDK, Webhooks and
                Integrations
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {profileLoading && <ActivityIndicator size="large" />}
      {profileError && <Snackbar visible={true}>{profileError}</Snackbar>}

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.accordionContainer}>
              <List.AccordionGroup>
                <List.Accordion title="Python" id="0">
                  <View style={styles.row}>
                    <Text style={styles.col}>Django</Text>
                    <Text style={styles.col}>Flask</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="JavaScript" id="1">
                  <View style={styles.row}>
                    <Text style={styles.col}>Vanilla JavaScript (+HTML5)</Text>
                    <Text style={styles.col}>React</Text>
                    <Text style={styles.col}>Vue</Text>
                    <Text style={styles.col}>Angular</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="Mobile Apps" id="2">
                  <Text style={styles.subHeader}>Android</Text>
                  <View style={styles.row}>
                    <Text style={styles.col}>React Native</Text>
                    <Text style={styles.col}>Flutter</Text>
                  </View>
                  <Text style={styles.subHeader}>iOS</Text>
                  <View style={styles.row}>
                    <Text style={styles.col}>Swift</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="PHP" id="3">
                  <View style={styles.row}>
                    <Text style={styles.col}>Wordpress</Text>
                    <Text style={styles.col}>Laravel</Text>
                    <Text style={styles.col}>Joomla</Text>
                    <Text style={styles.col}>Prestashop</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="Java" id="4">
                  <View style={styles.row}>
                    <Text style={styles.col}>Spring</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="Ruby" id="5">
                  <View style={styles.row}>
                    <Text style={styles.col}>Rails</Text>
                  </View>
                </List.Accordion>

                <List.Accordion title="C#" id="6">
                  <View style={styles.row}>
                    <Text style={styles.col}>ASP.Net</Text>
                  </View>
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    fontSize: 24,
  },
  accordionContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  col: {
    flex: 1,
    textAlign: "center",
  },
  subHeader: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  cardContainer: {
    padding: 10,
  },
});

export default Webhooks;
