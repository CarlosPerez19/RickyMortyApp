import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage implements OnInit {

  searchTerm = '';
  foundCharacters: any[] = [];
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  searchCharacter() {
    const name = this.searchTerm.trim().toLowerCase();
    if (!name) {
      this.foundCharacters = [];
      this.errorMessage = '';
      return;
    }

    this.loading = true;
    this.http.get<any>(`https://rickandmortyapi.com/api/character/?name=${name}`).subscribe({
      next: (res) => {
        this.foundCharacters = res.results;
        this.errorMessage = '';
        this.loading = false;
      },
      error: (err) => {
        this.foundCharacters = [];
        this.errorMessage = 'No se encontró ningún personaje con ese nombre.';
        this.loading = false;
      }
    });
  }

  goToDetails(character: any) {
    this.router.navigate(['/character', character.id]);
  }
}
