import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AdaWorkshopTestModule } from '../../../test.module';
import { CuentaComponent } from 'app/entities/cuenta/cuenta.component';
import { CuentaService } from 'app/entities/cuenta/cuenta.service';
import { Cuenta } from 'app/shared/model/cuenta.model';

describe('Component Tests', () => {
  describe('Cuenta Management Component', () => {
    let comp: CuentaComponent;
    let fixture: ComponentFixture<CuentaComponent>;
    let service: CuentaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdaWorkshopTestModule],
        declarations: [CuentaComponent],
      })
        .overrideTemplate(CuentaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CuentaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CuentaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cuenta(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cuentas && comp.cuentas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
