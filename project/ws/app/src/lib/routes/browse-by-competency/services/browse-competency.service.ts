import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { SeeAllService } from '../../see-all/services/see-all.service'

const API_ENDPOINTS = {
  SEARCH_V6: `/apis/proxies/v8/sunbirdigot/search`,
  // GET_COMPETENCY_AREA: `/apis/protected/v8/frac/getAllNodes/competencyarea`,
  SEARCH_COMPETENCY: `/apis/proxies/v8/searchBy/competency`,
}

@Injectable({
  providedIn: 'root',
})
export class BrowseCompetencyService {
  private removeFilter = new Subject<any>()
  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false)
  private displaySearchLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false)
  /**
   * Observable string streams
   */
  notifyObservable$ = this.removeFilter.asObservable()
  constructor(private http: HttpClient, private seeAllservice: SeeAllService) { }

  public isLoading(): Observable<boolean> {
    return this.displayLoader$
  }

  public isSearchLoading(): Observable<boolean> {
    return this.displaySearchLoader$
  }

  fetchSearchData(request: any): Observable<any> {
    this.displaySearchLoader$.next(true)
    return this.http.post<any>(API_ENDPOINTS.SEARCH_V6, request)
    .pipe(finalize(() => this.displaySearchLoader$.next(false)))
  }

  searchCompetency(_searchData: any): Observable<any> {
    this.displayLoader$.next(true)
    return this.http.get<any>(API_ENDPOINTS.SEARCH_COMPETENCY)
    .pipe(finalize(() => this.displayLoader$.next(false)))
  }

  public notifyOther(data: any) {
    if (data) {
      this.removeFilter.next(data)
    }
  }

  async getAllCompentencyParameters(competencyKey: string): Promise<any> {
    return await this.seeAllservice.getSeeAllConfigJson().then(data => {
      return data.compentency[competencyKey]
    })
  }

}
