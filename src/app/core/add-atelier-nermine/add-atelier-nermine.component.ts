import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Atelier } from '../../models/atelier';
import { AtelierService } from '../../services/atelier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-atelier-nadine',
  templateUrl: './add-atelier-nadine.component.html',
  styleUrls: ['./add-atelier-nadine.component.css']
})
export class AddAtelierNadineComponent {
  atelier: Atelier = {
    id: '',
    nom: '',
    emailFormateur: '',
    nbrParticipant: 0,
    statut: true
  };

  atelierForm!: FormGroup;

  constructor(private atelierService: AtelierService, private router: Router) {}

  ngOnInit() {
    this.atelierForm = new FormGroup({
      nom: new FormControl(this.atelier.nom, [Validators.required, Validators.minLength(5)]),
      emailFormateur: new FormControl(this.atelier.emailFormateur, [Validators.required, Validators.email]),
      nbrParticipant: new FormControl(this.atelier.nbrParticipant, [Validators.required, Validators.min(16)]),
      statut: new FormControl(this.atelier.statut)
    });
  }

  get nom() { return this.atelierForm.get('nom'); }
  get emailFormateur() { return this.atelierForm.get('emailFormateur'); }
  get nbrParticipant() { return this.atelierForm.get('nbrParticipant'); }

  onSubmit() {
    if (this.atelierForm.invalid) {
      this.atelierForm.markAllAsTouched();
      console.warn('form invalid', this.atelierForm);
      return;
    }
    this.atelierService.createAtelier(this.atelierForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/atelier/list');
      },
      error: (err) => {
        console.error('error creating atelier', err);
        alert('Erreur lors de la création : ' + (err.error?.error || err.message));
      }
    });
  }
}
