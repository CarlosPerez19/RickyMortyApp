import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonTextarea, 
  IonLoading 
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonTextarea,
    IonLoading,
    CommonModule,
    FormsModule,
  ],
})
export class CharacterDetailsPage implements OnInit {

  character: any = null;
  comment: string = '';
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacter(id);
    }
  }

  loadCharacter(id: string) {
    this.loading = true;
    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe({
      next: (res) => {
        this.character = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el personaje.';
        this.loading = false;
      }
    });
  }

  async saveCharacterWithComment() {
    if (!this.character) return;

    const characterData = {
      id: this.character.id,
      name: this.character.name,
      status: this.character.status,
      species: this.character.species,
      gender: this.character.gender,
      image: this.character.image,
      comment: this.comment.trim()
    };

    try {
      await addDoc(collection(this.firestore, 'characters'), characterData);
      alert('Personaje guardado con éxito!');
      this.comment = '';
    } catch (error) {
      alert('Error guardando personaje: ' + error);
    }
  }
}
