import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

const currentYear = new Date().getFullYear();

function Footer() {
  const softGlobalLink = () => {
    Linking.openURL("http://softglobal.org");
    Linking;
  };

  return (
    <View
      style={{
        backgroundColor: "#0f172a",
        paddingVertical: 10,
      }}
    >
      <View style={{ alignItems: "center", textAlign: "center" }}>
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            paddingVertical: 5,
            textAlign: "center",
          }}
        >
          <Text>Offices:</Text> Lagos (
          <Text style={{ fontWeight: "bold" }}>Coming soon:</Text> San
          Francisco, Ontario, London, Dubai, Mumbai, Accra, Johannesburg,
          Sidney, Sao Paulo, Nairobi, Shanghai, Amsterdam, Frankfurt)
        </Text>
        <Text style={{ color: "gray" }}>
          &copy; Paysofter Inc., {currentYear}.
        </Text>
        <Text style={{ color: "gray" }}>All rights reserved.</Text>
        <TouchableOpacity onPress={softGlobalLink}>
          <Text style={{ color: "#fff", fontSize: 12, fontStyle: "italic" }}>
            Powered by SoftGlobal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Footer;
