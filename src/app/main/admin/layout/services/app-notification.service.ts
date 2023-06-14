import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { AppNotificationActions } from "src/app/store/notification/notification.action";

interface NotificationPayload {
  title: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppNotificationService {
  constructor(private readonly appStore: Store<AppState>) { }

  showSuccess(payload: NotificationPayload) {
    this.appStore.dispatch(AppNotificationActions.success({ title: payload.title, message: payload.detail ?? null }));
  }

  showError(payload: NotificationPayload) {
    this.appStore.dispatch(AppNotificationActions.error({ title: payload.title, message: payload.detail ?? null }));
  }

  showWarning(payload: NotificationPayload) {
    this.appStore.dispatch(AppNotificationActions.warning({ title: payload.title, message: payload.detail ?? null }));
  }

  showInfo(payload: NotificationPayload) {
    this.appStore.dispatch(AppNotificationActions.info({ title: payload.title, message: payload.detail ?? null }));
  }
}
