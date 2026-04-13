import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { apiUrl } from '../utils/api';

export interface EditProfileFormData {
	profile_picture: string;
	height: string;
	weight: string;
	school: string;
	position: string;
	bio: string;
}

interface EditProfileModalProps {
	show: boolean;
	onHide: () => void;
	initialData: EditProfileFormData;
	onSave: (data: EditProfileFormData) => void;
}

export default function EditProfileModal({ show, onHide, initialData, onSave }: EditProfileModalProps) {
	// User input is stored in `formData` until you wire this to your API call.
	const [formData, setFormData] = useState<EditProfileFormData>(initialData);
	const [saveError, setSaveError] = useState('');

	useEffect(() => {
		if (show) {
			setFormData(initialData);
			setSaveError('');
		}
	}, [show, initialData]);

	const handleChange = (key: keyof EditProfileFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}));
	};

	const updateData = async(data: EditProfileFormData): Promise<EditProfileFormData> => {
		const response = await fetch(apiUrl('/users/'), {
			method: "PUT",
			credentials: "include",
			headers: {
    			'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		},)

		if (!response.ok) {
			const message = await response.text();
			throw new Error(message || 'Failed to save profile changes');
		}

		const saved = await response.json();
		return {
			profile_picture: saved.profile_picture ?? data.profile_picture,
			height: saved.height ?? data.height,
			weight: saved.weight ?? data.weight,
			school: saved.school ?? data.school,
			position: saved.position ?? data.position,
			bio: saved.bio ?? data.bio,
		};
	}

	const handleSave = async () => {
		try {
			const savedData = await updateData(formData);
			onSave(savedData);
			onHide();
		} catch (error) {
			setSaveError(error instanceof Error ? error.message : 'Failed to save profile changes');
		}
	};

	return (
		<Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
			<Modal.Header closeButton>
				<Modal.Title>Edit Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="edit-profile-grid">
					<InputGroup className="modal-input">
						<InputGroup.Text>Profile Picture URL</InputGroup.Text>
						<Form.Control
							placeholder="Paste image URL or base64 string"
							value={formData.profile_picture}
							onChange={(event) => handleChange('profile_picture', event.target.value)}
						/>
					</InputGroup>

					<InputGroup className="modal-input">
						<InputGroup.Text>Height (cm)</InputGroup.Text>
						<Form.Control
							placeholder="e.g. 198"
							value={formData.height}
							onChange={(event) => handleChange('height', event.target.value)}
						/>
					</InputGroup>

					<InputGroup className="modal-input">
						<InputGroup.Text>Weight (lbs)</InputGroup.Text>
						<Form.Control
							placeholder="e.g. 210"
							value={formData.weight}
							onChange={(event) => handleChange('weight', event.target.value)}
						/>
					</InputGroup>

					<InputGroup className="modal-input">
						<InputGroup.Text>School</InputGroup.Text>
						<Form.Control
							placeholder="Enter school"
							value={formData.school}
							onChange={(event) => handleChange('school', event.target.value)}
						/>
					</InputGroup>

					<InputGroup className="modal-input">
						<InputGroup.Text>Position</InputGroup.Text>
						<Form.Control
							placeholder="e.g. Guard"
							value={formData.position}
							onChange={(event) => handleChange('position', event.target.value)}
						/>
					</InputGroup>

					<InputGroup className="modal-input edit-profile-bio-input">
						<InputGroup.Text>Bio</InputGroup.Text>
						<Form.Control
							as="textarea"
							rows={4}
							placeholder="Tell coaches and scouts who you are as an athlete"
							value={formData.bio}
							onChange={(event) => handleChange('bio', event.target.value)}
						/>
					</InputGroup>
				</div>
			</Modal.Body>
			<Modal.Footer>
				{saveError && <div className="text-danger me-auto">{saveError}</div>}
				<Button className="ghost-button btn" onClick={onHide}>Cancel</Button>
				<Button className="action-button btn" onClick={handleSave}>Save Changes</Button>
			</Modal.Footer>
		</Modal>
	);
}
