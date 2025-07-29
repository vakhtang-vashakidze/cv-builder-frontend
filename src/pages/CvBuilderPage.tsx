import React, {useState} from 'react';
import {cvApi} from '../apis/cvApi';
import {cvSchema} from '../validations/CvSchema';
import {XCircleIcon} from '@heroicons/react/24/solid';
import type {CVRequest} from '../types/cv';

const CvBuilderPage = () => {
    const [formData, setFormData] = useState<CVRequest>({
        firstname: '',
        lastname: '',
        title: '',
        summary: '',
        email: '',
        phoneNumber: {prefix: '', number: ''},
        location: {country: '', city: ''},
        skills: [''],
        experiences: [
            {company: '', position: '', description: '', startDate: '', endDate: '', stillWorking: false},
        ],
    });

    const [errors, setErrors] = useState<Record<string, any>>({});

    const validate = () => {
        const parsed = cvSchema.safeParse(formData);
        if (!parsed.success) {
            const formatted = parsed.error.format();
            setErrors(formatted);
            return null;
        }
        setErrors({});
        return parsed.data;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            phoneNumber: {...prev.phoneNumber, [name]: value},
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            location: {...prev.location, [name]: value},
        }));
    };

    const handleSkillChange = (i: number, value: string) => {
        const updated = [...formData.skills];
        updated[i] = value;
        setFormData(prev => ({...prev, skills: updated}));
    };

    const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
        const updated = [...formData.experiences];
        (updated[index] as any)[field] = value;
        setFormData(prev => ({...prev, experiences: updated}));
    };

    const addSkill = () => setFormData(prev => ({...prev, skills: [...prev.skills, '']}));
    const removeSkill = (index: number) =>
        setFormData(prev => ({...prev, skills: prev.skills.filter((_, i) => i !== index)}));

    const addExperience = () =>
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, {
                company: '', position: '', description: '',
                startDate: '', endDate: '', stillWorking: false
            }]
        }));

    const removeExperience = (index: number) =>
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index),
        }));

    const handleDownload = async (type: 'pdf' | 'docx') => {
        const data = validate();
        if (!data) return;

        try {
            const file = type === 'pdf'
                ? await cvApi.downloadPdf(data)
                : await cvApi.downloadWord(data);

            const blob = new Blob([file], {
                type: type === 'pdf'
                    ? 'application/pdf'
                    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `cv.${type}`;
            link.click();
        } catch (err) {
            console.error('Download failed', err);
        }
    };

    const inputClass = (hasError: boolean) =>
        `border p-2 rounded w-full ${hasError ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <div className="w-[50%] mx-auto mt-10 p-6 bg-white shadow-md rounded-md">

            <h1 className="text-2xl font-bold mb-6">CV Builder</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['firstname', 'lastname', 'title', 'email'].map(field => (
                    <div key={field}>
                        <input
                            name={field}
                            placeholder={field[0].toUpperCase() + field.slice(1)}
                            value={formData[field as keyof CVRequest] as string}
                            onChange={handleChange}
                            className={inputClass(!!errors[field]?._errors?.length)}
                        />
                        {errors[field] && <p className="text-red-500 text-sm">{errors[field]._errors[0]}</p>}
                    </div>
                ))}
                <div className="col-span-full">
          <textarea
              name="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleChange}
              className={inputClass(!!errors.summary?._errors?.length)}
          />
                    {errors.summary && <p className="text-red-500 text-sm">{errors.summary._errors[0]}</p>}
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Phone Number</h2>
            <div className="flex gap-4">
                <div className="w-1/3">
                    <input
                        name="prefix"
                        placeholder="Prefix"
                        value={formData.phoneNumber.prefix}
                        onChange={handlePhoneChange}
                        className={inputClass(!!errors.phoneNumber?.prefix?._errors?.length)}
                    />
                    {errors.phoneNumber?.prefix &&
                        <p className="text-red-500 text-sm">{errors.phoneNumber.prefix._errors[0]}</p>}
                </div>
                <div className="w-2/3">
                    <input
                        name="number"
                        placeholder="Number"
                        value={formData.phoneNumber.number}
                        onChange={handlePhoneChange}
                        className={inputClass(!!errors.phoneNumber?.number?._errors?.length)}
                    />
                    {errors.phoneNumber?.number &&
                        <p className="text-red-500 text-sm">{errors.phoneNumber.number._errors[0]}</p>}
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Location</h2>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <input
                        name="country"
                        placeholder="Country"
                        value={formData.location.country}
                        onChange={handleLocationChange}
                        className={inputClass(!!errors.location?.country?._errors?.length)}
                    />
                    {errors.location?.country &&
                        <p className="text-red-500 text-sm">{errors.location.country._errors[0]}</p>}
                </div>
                <div className="w-1/2">
                    <input
                        name="city"
                        placeholder="City"
                        value={formData.location.city}
                        onChange={handleLocationChange}
                        className={inputClass(!!errors.location?.city?._errors?.length)}
                    />
                    {errors.location?.city && <p className="text-red-500 text-sm">{errors.location.city._errors[0]}</p>}
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
            {formData.skills.map((skill, i) => (
                <div key={i} className="flex flex-col items-center gap-2 mb-2">
                    <div className="flex flex-row items-center gap-2 w-full">
                        <input
                            value={skill}
                            onChange={e => handleSkillChange(i, e.target.value)}
                            className={`border p-2 rounded w-full ${errors.skills?.[i]?._errors?.length ? 'border-red-500' : ''}`}
                        />
                        <XCircleIcon onClick={() => removeSkill(i)} className="w-5 h-5 text-red-500 cursor-pointer"/>
                    </div>
                    {errors.skills?.[i]?._errors?.[0] && (
                        <p className="text-red-500 text-sm">{errors.skills[i]._errors[0]}</p>
                    )}
                </div>
            ))}
            <button onClick={addSkill} className="text-blue-500 underline text-sm mb-4 cursor-pointer">+ Add Skill
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-2">Experiences</h2>
            {formData.experiences.map((exp, i) => (
                <div key={i} className="border p-4 rounded mb-4 space-y-2 relative">
                    <XCircleIcon
                        onClick={() => removeExperience(i)}
                        className="float-right top-2 right-2 w-5 h-5 text-red-500 cursor-pointer"
                    />
                    {['company', 'position', 'description'].map(field => (
                        <div key={field}>
                            <input
                                placeholder={field[0].toUpperCase() + field.slice(1)}
                                value={exp[field as keyof typeof exp] as string}
                                onChange={e => handleExperienceChange(i, field, e.target.value)}
                                className={inputClass(!!errors.experiences?.[i]?.[field]?._errors?.length)}
                            />
                            {errors.experiences?.[i]?.[field] && (
                                <p className="text-red-500 text-sm">{errors.experiences[i][field]._errors[0]}</p>
                            )}
                        </div>
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">Start Date</label>
                            <input
                                type="date"
                                value={exp.startDate}
                                onChange={e => handleExperienceChange(i, 'startDate', e.target.value)}
                                className={inputClass(!!errors.experiences?.[i]?.startDate?._errors?.length)}
                            />
                            {errors.experiences?.[i]?.startDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.experiences[i].startDate._errors[0]}</p>
                            )}
                        </div>

                        {!exp.stillWorking && (
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">End Date</label>
                                <input
                                    type="date"
                                    value={exp.endDate}
                                    onChange={e => handleExperienceChange(i, 'endDate', e.target.value)}
                                    className={inputClass(!!errors.experiences?.[i]?.endDate?._errors?.length)}
                                />
                                {errors.experiences?.[i]?.endDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.experiences[i].endDate._errors[0]}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-2">
                        <label className="inline-flex items-center text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={exp.stillWorking}
                                onChange={e => handleExperienceChange(i, 'stillWorking', e.target.checked)}
                                className="mr-2 cursor-pointer"
                            />
                            Still working
                        </label>
                    </div>
                </div>
            ))}
            <button onClick={addExperience} className="text-blue-500 underline text-sm mb-4 cursor-pointer">+ Add
                Experience
            </button>

            <div className="flex gap-4 mt-6">
                <button onClick={() => handleDownload('pdf')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Download
                    PDF
                </button>
                <button onClick={() => handleDownload('docx')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">Download
                    Word
                </button>
            </div>
        </div>
    );
};

export default CvBuilderPage;
