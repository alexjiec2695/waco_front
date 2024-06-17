import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { users } from 'src/app/model/users';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private service: ServicesService,
    private message: NzMessageService,
    private router: Router) { }

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.service.login({
        Email: this.validateForm.value.email,
        Password: this.validateForm.value.password
      } as users).subscribe(r => {
        if (r.status == 200 ) {
          localStorage["login"] = true
          localStorage["id"] = r.body.ID
          window.location.href="/pokemons"
        } else {
          this.message.create("error", `usuario o contraseña equivocada `);
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
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  register(){
    this.router.navigate(['/register']);
  }
}
