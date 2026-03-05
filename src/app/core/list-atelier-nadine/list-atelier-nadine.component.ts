import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Atelier } from '../../models/atelier';
import { AtelierService } from '../../services/atelier.service';

@Component({
  selector: 'app-list-atelier-nadine',
  templateUrl: './list-atelier-nadine.component.html',
  styleUrls: ['./list-atelier-nadine.component.css']
})
export class ListAtelierNadineComponent {
  ateliers: Atelier[] = [];

  constructor(private atelierService: AtelierService, private router: Router) {}

  ngOnInit() {
    this.atelierService.readAllAteliers().subscribe((data) => {
      console.log(data);
      this.ateliers = data;
    });
  }

  deleteAtelier(id: any) {
    this.atelierService.deleteAtelier(id).subscribe(() => {
      this.ateliers = this.ateliers.filter((a) => a.id != id);
    });
  }

  goDetails(id: any) {
    this.router.navigateByUrl('/atelier/details/' + id);
  }

  goUpdate(id: any) {
    this.router.navigateByUrl('/atelier/update/' + id);
  }
}
