export interface xuesheng
{
    id?: number,
    name?: string,
    grade?: number,
    class?: number,
    gender?: string,
    englishName?: string,
    isFromAbroad?: boolean
}

export interface tiaojianLeixing
{
    nameTj?: string
    genderTj?: string,
    isFromAbroadTj?: boolean
}

export interface teacher{
      id? : number,
      name?: string,
      birthday?: string,
      gender?: string,
      graduatedSchool?: string,
      political?: string,
      degree?: string,
      idNumber?: string,
  }

export interface  tiaojianteacher{
    idtj?: number,
    nametj?: string,
    birthdaytj?: string,
    gendertj?: string,
    graduatedSchooltj?: string,
    politicaltj?: string,
    degreetj?: string,
    idNumbertj?: string,  
}

export interface major{
    id?: number
    name?: string
    description?: string
    years?: number
    startTime?: string
    isImportant?: boolean
}

export interface tiaojianmajor{
    idtj?: number,
    nametj?: string,
    descriptiontj?: string,
    yearstj?: number,
    startTimetj?: string,
    isImportanttj?: boolean
}