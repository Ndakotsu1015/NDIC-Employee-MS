import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { AppLoadingActions } from "src/app/store/loading/loading.action";


@Injectable({
  providedIn: 'root',
})
export class AppLoadingService {
  constructor(private readonly appStore: Store<AppState>) { }

  startLoading(label: string | null) {
    this.appStore.dispatch(AppLoadingActions.startLoading({ label }));
  }

  stopLoading() {
    this.appStore.dispatch(AppLoadingActions.stopLoading());
  }
}
