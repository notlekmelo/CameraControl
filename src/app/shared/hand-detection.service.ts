import { Injectable } from '@angular/core';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

@Injectable({
  providedIn: 'root'
})
export class HandDetectionService {
  private hands: Hands;
  private videoElement!: HTMLVideoElement;
  private cursorElement!: HTMLImageElement;
  private isClicking = false;
  private camera: Camera | null = null; // Adicione uma referência para a câmera

  constructor() {
    this.hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.hands.onResults(this.onResults.bind(this));
  }

  initialize(videoElement: HTMLVideoElement, cursorElement: HTMLImageElement) {
    this.videoElement = videoElement;
    this.cursorElement = cursorElement;

    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 1920,
      height: 1080
    });

    this.camera.start();
  }

  private onResults(results: Results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (const landmarks of results.multiHandLandmarks) {
        // Desenhar os landmarks da mão
        const thumbTip = landmarks[4]; // Ponto do polegar
        const indexTip = landmarks[8]; // Ponto do indicador

        const cursorX = (1-indexTip.x) * window.innerWidth;
        const cursorY = indexTip.y * window.innerHeight;
        this.cursorElement.style.left = `${cursorX}px`;
        this.cursorElement.style.top = `${cursorY}px`;

        // Calcula a distância entre o polegar e o indicador
        const distance = Math.sqrt(
          Math.pow(thumbTip.x - indexTip.x, 2) +
          Math.pow(thumbTip.y - indexTip.y, 2)
        );

        // Verifica se a distância é menor que um determinado limiar
      if (distance < 0.05) { // Ajuste o valor conforme necessário
        // Calcula a posição do toque no canvas
        if (!this.isClicking) {
          this.isClicking = true;
          this.cursorElement.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";    
          this.simulateClick(cursorX, cursorY);
        }
      }
      else if (this.isClicking) {
        this.isClicking = false;
        this.cursorElement.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 14a8 8 0 0 1-8 8'/%3E%3Cpath d='M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0'/%3E%3Cpath d='M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1'/%3E%3Cpath d='M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10'/%3E%3Cpath d='M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/%3E%3C/svg%3E";
      }
      }
    }
  }
  
  private simulateClick(touchX: number, touchY: number) {
  
    // Converta o NodeList para Array
    const buttons = Array.from(document.querySelectorAll('#buttons .click'));
  
    // Verifique todos os botões e simule o clique no botão que está sob a posição do toque
    for (const button of buttons) {
      const buttonRect = button.getBoundingClientRect();
  
      // Ajuste as coordenadas para o sistema de coordenadas do viewport
      const buttonLeft = buttonRect.left
      const buttonTop = buttonRect.top
      const buttonRight = buttonRect.right
      const buttonBottom = buttonRect.bottom
      if (
        touchX >= buttonLeft &&
        touchX <= buttonRight &&
        touchY >= buttonTop &&
        touchY <= buttonBottom
      ) {
        // Crie um evento de clique e despache para o botão
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        if (button.getAttribute('disabled') == null ){
          button.dispatchEvent(event);
        }
        break; // Assume que um único clique é suficiente
      }
    }
  }
  
  stop() {
    if (this.camera) {
      this.camera.stop(); // Pare a câmera
    }
  }  
}
