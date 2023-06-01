import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/User.model";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  UserForm: FormGroup;
  displayedColumns=['name','passport'];
  passport: File | undefined;
  users = new MatTableDataSource<User>([]);
  media_url=environment.media_url

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private UserService: UserService) {
    this.UserForm = this.formBuilder.group({
      name: ['', Validators.required],
      passport: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.UserService.getUsers().subscribe(users => this.users.data = users)
  }

  openDialog(UserDialog: TemplateRef<any>) {
    this.UserForm.reset();
    this.dialog.open(UserDialog);
  }


  saveUser() {
    if (this.UserForm.invalid && this.passport!=undefined && this.passport?.size > 0) {
      return;
    }
    //this.UserForm.get('passport')!.setValue(this.passport);
    let user = this.UserForm.getRawValue();
    this.UserService.addUser(user).subscribe(data => {
      this.users.data.push(data);
      this.users._updateChangeSubscription();
      this.UserForm.reset();
      this.dialog.closeAll();

    });


  }

  setFile(target:any) {
    this.passport = target.files[0]
    this.UserForm.get('passport')?.setValue( this.passport)
  }

}
