import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User.model";
import {environment} from "../../environments/environment";
import {UserDTO} from "../interfaces/UserDTO.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.server_url  + 'user');
  }

  public addUser(user:UserDTO): Observable<User> {
    const data = new FormData();
    data.append('name',user.name)
    data.append('passport',user.passport)
    return this.http.post<User>(environment.server_url  + 'user',data);
  }


}
