// export interface Mr30 {
//   course_year: string;
//   course_semester: string;
//   RECORD: Rec[];
// }

// export interface Rec {
//   [x: string]: any;
//   id: string;
//   course_no: string;
//   course_credit: string;
//   course_study_datetime: string;
//   course_room: string;
//   course_examdate: string;
//   course_comment: string;
// }

export interface Mr30{​​​​​​​
  course_year:string;
  course_semester:string;
  RECORD:Rec[];
}​​​​​​​
 
export interface Rec{​​​​​​​
  id:string;
  course_year:string;
  course_semester:string;
  course_no:string;
  course_method:string;
  course_method_number:string;
  day_code:string;
  time_code:string;
  room_group:string;
  instr_group:string;
  course_credit:string;
  course_method_detail:string;
  day_name_s:string;
  time_period:string;
  time_period_text:string;
  course_room:string;
  course_instructor:string;
  show_ru30:string;
  course_pr:string;
  course_comment:string;
  course_examdate:string;
  study_now:string
  now_text:string

}​​​​​​​
