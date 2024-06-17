import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin = false
  isCollapsed = false;

  constructor(){
    if (localStorage["login"]){
        this.isLogin = true
    }
  }

  Close(){
    localStorage.removeItem("login")
    window.location.reload()
  }

}
