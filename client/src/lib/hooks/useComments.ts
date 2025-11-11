import { useLocalObservable } from 'mobx-react-lite';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { useEffect, useRef } from 'react';
import { runInAction } from 'mobx';

export const useComments = (gigId?: string) => {
  const created = useRef(false);
  const commentStore = useLocalObservable(() => ({
    comments: [] as ChatComment[],
    hubConnection: null as HubConnection | null,

    createHubConnection(gigId: string) {
      if (!gigId) return;
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_COMMENT_URL}?gigId=${gigId}`, {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log('Error establishing connection: ' + error)
        );

      this.hubConnection.on('LoadComments', (comments) => {
        console.log('we have comment');
        runInAction(() => {
          console.log('we have comment2');
          this.comments = comments;
          console.log(comments);
        });
      });

      this.hubConnection.on('RecieveComment', (comment) => {
        console.log('recieve');
        console.log(comment);
        runInAction(() => {
          this.comments.unshift(comment);
        });
      });
    },
    stopHubConnection() {
      if (this.hubConnection?.state === HubConnectionState.Connected) {
        this.hubConnection
          .stop()
          .catch((error) => console.log('Error stopping connection: ', error));
      }
    },
  }));

  useEffect(() => {
    if (gigId && !created.current) {
      commentStore.createHubConnection(gigId);
      created.current = true;
    }
    return () => {
      commentStore.stopHubConnection();
      commentStore.comments = [];
    };
  }, [gigId, commentStore]);

  return {
    commentStore,
  };
};
