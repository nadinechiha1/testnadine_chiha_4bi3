import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atelier } from '../../models/atelier';
import { AtelierService } from '../../services/atelier.service';

@Component({
  selector: 'app-update-atelier-nadine',
  templateUrl: './update-atelier-nadine.component.html',
  styleUrls: ['./update-atelier-nadine.component.css']
})
export class UpdateAtelierNadineComponent {
  atelier: Atelier = {
    id: '',
    nom: '',
    emailFormateur: '',
    nbrParticipant: 0,
    statut: true
  };
  atelierForm!: FormGroup;
  id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private atelierService: AtelierService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize form immediately to avoid template errors
    this.atelierForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(5)]),
      emailFormateur: new FormControl('', [Validators.required, Validators.email]),
      nbrParticipant: new FormControl(0, [Validators.required, Validators.min(16)]),
      statut: new FormControl(true)
    });

    // Get atelier ID from route
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('Loading atelier with ID:', this.id);

    // Fetch data from API
    this.atelierService.readOneAtelier(this.id).subscribe({
      next: (data) => {
        console.log('Atelier data received:', data);
        this.atelier = data.atelier || data;
        // Patch the form with fetched values
        this.atelierForm.patchValue({
          nom: this.atelier.nom,
          emailFormateur: this.atelier.emailFormateur,
          nbrParticipant: this.atelier.nbrParticipant,
          statut: this.atelier.statut
        });
      },
      error: (err) => {
        console.error('Error loading atelier:', err);
        alert('Erreur lors du chargement : ' + (err.error?.error || err.message));
      }
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
    this.atelierService.updateAtelier(this.id, this.atelierForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/atelier/list');
      },
      error: (err) => {
        console.error('error updating atelier', err);
        alert('Erreur lors de la mise à jour : ' + (err.error?.error || err.message));
      }
    });
  }

  back() {
    this.router.navigateByUrl('/atelier/list');
  }
}
