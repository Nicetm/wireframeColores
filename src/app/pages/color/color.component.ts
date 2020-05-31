import { Component, OnInit, } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { DataColors } from '../../shared/color';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  public dataColors = {} as DataColors;
  public totalPage = [];
  public page: number = 0;
  id: number;
  private sub: any;

  constructor(public colorService: ColorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.goToPage(this.id);
  }

  
  goToPage(pageNum: number) {
    this.colorService.getColors(pageNum).subscribe(dataColors => {
      this.dataColors = dataColors;
      this.totalPage = [];
      for(var i=1; i<=dataColors.total_pages; i++) {
        this.totalPage.push(i);
      }
    }, error => {
      console.log(error);
    });
  }

  copiedColor(color) {
    let selBox = document.createElement('textarea');
    selBox.value = color;
    document.body.appendChild(selBox)
    selBox.focus();
    selBox.select();
    selBox.click();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    Swal.fire({
      title: 'Color Copiado',
      html: '<hr><h4>Pega el color seleccionado en la caja de texto</h4><p style="color:'+color+'">' + color + '</p><p><input type="text" style="color:'+color+'; border-color:'+color+'"></p><hr>',
      confirmButtonColor: color,
    })
  }
}
