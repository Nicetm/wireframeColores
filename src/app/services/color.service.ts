import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataColors } from '../shared/color';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  getColors(page: number): Observable<DataColors> {
    return this.http.get<DataColors>(environment.colorUrl + "?page=" + page).retryWhen((err) => {
      return err.delay(1000).take(2);
    })
  }
}
