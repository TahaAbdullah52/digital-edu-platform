import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryItemComponent } from './story-item.component';

describe('StoryItemComponent', () => {
  let component: StoryItemComponent;
  let fixture: ComponentFixture<StoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
