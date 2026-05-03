export interface User {
  user_id: string;
  user_name: string;
  user_mobile: string;
  user_email: string;
  user_type: string;
  created_at: string;
}

export interface Marriage {
  marriage_id: string;
  groom_name: string;
  bride_name: string;
  marriage_date: string;
  marriage_location: string;
}

export interface Engagement {
  engagement_id: string;
  groom_name: string;
  bride_name: string;
  engagement_date: string;
  engagement_location: string;
}

export interface Reception {
  reception_id: string;
  groom_name: string;
  bride_name: string;
  reception_date: string;
  reception_location: string;
}

export interface Event {
  event_id: string;
  event_name: string;
  has_marriage: boolean;
  has_reception: boolean;
  has_engagement: boolean;
  event_marriage: Marriage | null;
  event_reception: Reception | null;
  event_engagement: Engagement | null;
}

export interface UserEvent {
  user_event_id: string;
  is_admin: boolean;
  joined_at: string;
  event: Event;
}

export interface Invitation {
  invitation_id: string;
  name1: string;
  name2: string;
  name3: string;
  event: Event;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
