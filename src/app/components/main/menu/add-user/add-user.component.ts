///<reference path="../../../../../../node_modules/rxjs/internal/Observable.d.ts"/>
import {Component, Inject, OnInit} from '@angular/core';

import { User } from '../../../../models/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';

import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserService} from '../../../../services/user.service';

export class InfoResponse {
  response: string;
}



@Component({
  selector: 'app-add-user',
 templateUrl: './add-user.component.html',
 styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  set isSent(value: boolean) {
    this._isSent = value;
  }
  user: User;

  hide: boolean = true;


  userForm: FormGroup;

  private _isSent = false;

  constructor(public  matDialogRef: MatDialogRef<AddUserComponent>,
              private router: Router, private snackBar: MatSnackBar,
              private fb: FormBuilder, public userService: UserService) {

  }
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
  ]);
  lastnameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
  ]);
  passwordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);

  createForm() {
    this.userForm = this.fb.group({
      firstName: this.firstnameControl,
      lastName: this.lastnameControl,
      email: this.emailControl,
      password: this.passwordControl,
    });
  }


  createUser () {
    this.user = this.userForm.value;
    this.userService.createUser(this.user).subscribe((info: InfoResponse) => {
      this.snackBar.open(info.response, null, {
        duration: 4000
      });
      this._isSent = true;
      }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.response, null, {
          duration: 5000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }



}



