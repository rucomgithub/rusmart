export interface Mr30 {
  course_year: string;
  course_semester: string;
  RECORD: Rec[];
}

export interface Rec {
  id: string;
  course_no: string;
  course_credit: string;
  course_study_datetime: string;
  course_room: string;
  course_examdate: string;
  course_comment: string;
}