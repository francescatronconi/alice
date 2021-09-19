import { Component, OnInit } from '@angular/core';
import { AcceptCookieService } from 'src/app/services/accept-cookie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  policy = environment.privacy;

  constructor(public cookies: AcceptCookieService) { }

  ngOnInit(): void {
  }

}
