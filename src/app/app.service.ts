import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public BASE_URL = 'http://localhost:8080/';
    
    private URLS_PATH = this.BASE_URL + 'urls';

    constructor(private http: HttpClient) {}

    getOne(id: number) {
        return this.http.get<any>(this.BASE_URL + id);
    }

    getAll() {
        return this.http.get<any>(this.URLS_PATH);
    }

    create(url: string) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };

        return this.http.post<String>(this.URLS_PATH + "/create", JSON.stringify({url}), httpOptions);
    }

    delete(id: number) {
        return this.http.delete<any>(this.URLS_PATH + "/delete/" + id);
    }
} 