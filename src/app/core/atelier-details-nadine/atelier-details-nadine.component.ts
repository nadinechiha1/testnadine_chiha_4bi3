import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atelier } from '../../models/atelier';
import { AtelierService } from '../../services/atelier.service';

@Component({
  selector: 'app-atelier-details-nadine',
  templateUrl: './atelier-details-nadine.component.html',
  styleUrls: ['./atelier-details-nadine.component.css']
})
export class AtelierDetailsNadineComponent {
  atelier!: Atelier;
  id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private atelierService: AtelierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.atelierService.readOneAtelier(this.id).subscribe((data) => {
      this.atelier = data.atelier || data;
    });
  }

  back() {
    this.router.navigateByUrl('/atelier/list');
  }
}
