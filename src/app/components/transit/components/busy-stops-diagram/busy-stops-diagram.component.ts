import {Component, Input, OnInit} from '@angular/core';
import {DiagramService} from '../../../../services/diagram.service';
import {Stop} from '../../../../models/stop.model';
import {multi2} from './mock-2.data';

@Component({
  selector: 'app-busy-stops-diagram',
  templateUrl: './busy-stops-diagram.component.html',
  styleUrls: ['./busy-stops-diagram.component.css']
})
export class BusyStopsDiagramComponent implements OnInit {
  @Input() id: number;
  @Input() stopList: Stop[];

  data;
  view = [1200];
  public visible = false;

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit(): void {
    this.diagramService.getHeatMapData(this.id)
      .subscribe(res => this.data = res);
    this.visible = true;
  }
}
