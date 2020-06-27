import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  user: string
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.authState.displayName
  }

}
