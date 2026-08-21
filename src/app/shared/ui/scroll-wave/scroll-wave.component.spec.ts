import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollWaveComponent } from './scroll-wave.component';

describe('ScrollWaveComponent', () => {
  let component: ScrollWaveComponent;
  let fixture: ComponentFixture<ScrollWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollWaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
