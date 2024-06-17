import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { users } from 'src/app/model/users';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServicesService,
    private message: NzMessageService,
    private router: Router) { }

  validateForm!: UntypedFormGroup;
  
  submitForm(): void {
    if (this.validateForm.valid) {
      this.service.createUser({
        Email: this.validateForm.value.email,
        Password: this.validateForm.value.password
      } as users).subscribe(r => {
        r.status == 200 ? this.router.navigate(["/login"]) : this.message.create("error", `Error creando usuario intente mas tarde `);
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls["checkPassword"].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false]
    });
  }

  back(){
this.router.navigate(["/login"])
  }

}
