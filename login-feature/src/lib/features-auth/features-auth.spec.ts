import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesAuth } from './features-auth';

describe('FeaturesAuth', () => {
  let component: FeaturesAuth;
  let fixture: ComponentFixture<FeaturesAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesAuth],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
