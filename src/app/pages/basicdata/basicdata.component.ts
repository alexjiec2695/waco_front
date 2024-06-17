import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { users } from 'src/app/model/users';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-basicdata',
  templateUrl: './basicdata.component.html',
  styleUrls: ['./basicdata.component.css']
})
export class BasicdataComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServicesService,
    private message: NzMessageService,
    private router: Router) { }

  submitForm(): void {
    if (this.validateForm.valid) {

      this.service.updateUsers({
        Address: this.validateForm.value.address,
        Birthdate: this.validateForm.value.birthdate,
        City: this.validateForm.value.city,
        Email: this.validateForm.value.email,
        ID: localStorage["id"],
        Name: this.validateForm.value.name,
        Password: this.validateForm.value.password
      } as users).subscribe(r => {
        if (r.status == 200) {
          this.router.navigate(['/pokemons']);
        }

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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      city: [null, [Validators.required]],
      id: [localStorage["id"]]
    });
    this.getUser()

  }

  getUser() {
    this.service.getUser(localStorage["id"]).subscribe(r => {

      this.validateForm = this.fb.group({
        name: [r.body?.Name, [Validators.required]],
        email: [r.body?.Email, [Validators.email, Validators.required]],
        password: [r.body?.Password, [Validators.required]],
        address: [r.body?.Address, [Validators.required]],
        birthdate: [r.body?.Birthdate, [Validators.required]],
        city: [r.body?.City, [Validators.required]],
        id: [localStorage["id"]]
      });

    })
  }
}
