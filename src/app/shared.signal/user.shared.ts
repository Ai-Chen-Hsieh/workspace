import { Injectable, signal } from "@angular/core";
import { userInfo } from "../model/user.model";

@Injectable({ 
  providedIn: 'root'
})

export class UserSharedService {
  userSignal = signal<any>({});
  userAuthSignal = signal<string  | null>(null);
}