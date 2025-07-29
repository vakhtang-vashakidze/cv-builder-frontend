export interface PhoneNumber {
    prefix: string;
    number: string;
}

export interface Location {
    country: string;
    city: string;
}

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    stillWorking: boolean;
    description: string;
}

export interface CVRequest {
    firstname: string;
    lastname: string;
    title: string;
    summary: string;
    phoneNumber: PhoneNumber;
    location: Location;
    skills: string[];
    experiences: Experience[];
    email: string;
}
