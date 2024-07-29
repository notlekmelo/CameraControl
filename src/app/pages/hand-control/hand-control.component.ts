import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { HandDetectionService } from '../../shared/hand-detection.service';

@Component({
  selector: 'app-hand-control',
  templateUrl: './hand-control.component.html',
  styleUrls: ['./hand-control.component.scss'],
})
export class HandControlComponent implements OnInit, AfterViewInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('cursor', { static: false }) cursorElement!: ElementRef;

  constructor(
    private handDetectionService: HandDetectionService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.handDetectionService.initialize(
      this.videoRef.nativeElement,
      this.cursorElement.nativeElement
    );
  }

  corBotao1: string = 'blue';
  corBotao2: string = 'blue';
  corBotao3: string = 'blue';

  mudarCorBotao(numeroBotao: number) {
    switch(numeroBotao) {
      case 1:
        this.corBotao1 = this.corBotao1 === 'blue' ? 'green' : 'blue';
        break;
      case 2:
        this.corBotao2 = this.corBotao2 === 'blue' ? 'green' : 'blue';
        break;
      case 3:
        this.corBotao3 = this.corBotao3 === 'blue' ? 'green' : 'blue';
        break;
    }
  }

}
