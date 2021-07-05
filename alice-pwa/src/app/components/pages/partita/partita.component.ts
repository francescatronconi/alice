import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.scss']
})
export class PartitaComponent implements OnInit {

  constructor(
    public shared: SharedDataService,
    private router: Router,
    ) { }
  
  ngOnInit(): void {
  }

  clickItem() {
    this.shared.restartGame();
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }

  clickItemToContinue() {
    this.router.navigate(['/']);
  }

  closeWindow() {
    window.parent.close()
  }
}
