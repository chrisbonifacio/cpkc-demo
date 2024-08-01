"use client";

import { useEffect, useState } from "react";

import "aws-amplify/auth/enable-oauth-listener";
import {
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
} from "aws-amplify/auth";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>({ authMode: "userPool" });

type Notification = Schema["notifications"]["type"];

function Home() {
  const [user, setUser] = useState<AuthUser>();
  const [notification, setNotification] = useState<Notification>();

  const createNotification = async () => {
    const { data, errors } = await client.models.notifications.create({
      user_id: user?.userId as string,
      message: "Welcome to the app!",
    });

    console.log(data);
  };

  const authenticate = async () => {
    try {
      await fetchAuthSession();
      const user = await getCurrentUser();

      setUser(user);
    } catch (error) {
      signInWithRedirect({
        provider: {
          custom: "InternalSAML",
        },
      });
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    const subToNotifications = client.subscriptions
      .subscribeToNotificationsByUserId({
        userId: user?.userId ?? "",
      })
      .subscribe({
        next: (data) => {
          setNotification(data);
        },
        error: (error) => console.error(error),
      });

    return () => subToNotifications.unsubscribe();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          Welcome, {user?.username}
          <button onClick={createNotification}>Create Notification</button>
          <div>{notification?.message}</div>
        </>
      ) : null}
    </main>
  );
}

export default Home;
