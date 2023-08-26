import emergencyKit from '$lib/assets/svg/emergency-kit.svg';
import surgery from '$lib/assets/svg/surgery.svg';
import patientBed from '$lib/assets/svg/patient-bed.svg';

export const otherServices = [
	{
		title: 'Emergency treatments',
		description:
			'Sudden on-set of Testicular pain, flank pain, sudden urine blockage, frank blood in the urine.',
		icon: emergencyKit
	},
	{
		title: 'Surgical procedures',
		description:
			'All kinds of surgical procedures related to kidneys, ureter, bladder, prostate, testes and penis.',
		icon: surgery
	},
	{
		title: 'In-Patient Facilities',
		description:
			'Patients are admitted to investigate and treat all the complicated diseases of prostate, bladder, kidneys and testes.',
		icon: patientBed
	}
] as const;
