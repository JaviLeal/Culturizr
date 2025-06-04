import { Component, OnInit } from '@angular/core';
import { RankingService, RankingEntry } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  topPlayers: RankingEntry[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingService.getTopPlayers().subscribe({
      next: (data) => {
        this.topPlayers = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el ranking:', err);
        this.error = 'No se pudo cargar el ranking.';
        this.cargando = false;
      }
    });
  }
}
