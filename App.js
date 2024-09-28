// App.js
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { MyDrawer } from "./src/navigation/drawer";
import { initializeStore } from "./src/redux/store";
import IdleLogout from "./src/IdleLogout";
// import { setAxiosStore } from "./src/axiosConfig";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

// export const navigationRef = useNavigationContainerRef();

export default function App() {
  const [store, setStore] = useState(null);
  const [isAppReady, setAppReady] = useState(false);

  // const [isNavigationReady, setIsNavigationReady] = React.useState(false);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const initStore = async () => {
      const store = await initializeStore();
      setStore(store);
      setAppReady(true);
      // setAxiosStore(store);
    };
    initStore();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);

    SplashScreen.preventAutoHideAsync()
      .then(() => console.log("Splash screen prevented auto hide"))
      .catch(console.warn);
  }, []);

  if (!store || !isAppReady) {
    return null;
  }

  NavigationBar.setBackgroundColorAsync("#0f172a");

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          // setIsNavigationReady(true);
          console.log("Navigation is ready");
        }}
      >
        <IdleLogout>
          <MyDrawer />
        </IdleLogout>
        <StatusBar style="light" translucent={true} hidden={false} />
      </NavigationContainer>
    </Provider>
  );
}
