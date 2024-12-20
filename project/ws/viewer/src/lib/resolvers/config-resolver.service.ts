import { Injectable  } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { NsInstanceConfig, ConfigurationsService, IResolveResponse } from '@sunbird-cb/utils-v2'

@Injectable()
export class ConfigResolverService  {

  constructor(private configSvc: ConfigurationsService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<NsInstanceConfig.IConfig> {

    const result: IResolveResponse<NsInstanceConfig.IConfig> = {
      data: this.configSvc.instanceConfig,
      error: null,
    }
    return of(result)
  }
}
