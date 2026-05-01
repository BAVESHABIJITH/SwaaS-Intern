import { useState } from 'react';

type PetType = 'Dog' | 'Cat' | 'Bird' | '';

function RegistrationPage() {
    const [selectedPetType, setSelectedPetType] = useState<PetType>('');
    
    const breedData: Record<string, string[]> = {
        "Dog": ["Labrador", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Dachshund"],
        "Cat": ["Persian", "Siamese", "Maine Coon", "Bengal", "British Shorthair", "Sphynx", "Ragdoll", "Scottish Fold"],
        "Bird": ["Parrot", "Canary", "Cockatiel", "Budgerigar", "Lovebird", "Macaw", "African Grey", "Finch"]
    };

    const handlePetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPetType(e.target.value as PetType);
    };

    const getBreedOptions = () => {
        if (selectedPetType === '' || !breedData[selectedPetType]) {
            return [<option key="default" value="">Select pet type first</option>];
        }
        
        const breeds = breedData[selectedPetType];
        return [
            <option key="default" value="">Select a breed</option>,
            ...breeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
            ))
        ];
    };

    return (
        <>
        <div className="d-flex justify-content-center align-items-center">
            <div className="container bg-light m-5 p-3 rounded" style={{ backgroundColor: '#d5e4e667' }}>
        <h1 className="h1 text-center">Registration Form</h1>
        <div className="row">
            <div className="col owner-details">
        <div className="col-md">
            <h2 className="h2 text-center">Enter Owner Details below</h2>
            <div className="input-group mb-3">
                <span className="input-group-text" id="fullName">Full Name</span>
                <input type="text" className="form-control" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input type="email" id="email" className="form-control" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Phone Number</span>
                <input type="text" id="phone" className="form-control" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Address</span>
                <textarea name="address" id="address" className="form-control" cols={30} rows={10}></textarea>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input type="password" className="form-control" />
            </div>
        </div>
       </div>
       <div className="col-md pet-details">
        <h2 className="h2 text-center">Enter Pet Details below</h2>
        <div className="input-group mb-3">
            <span className="input-group-text" id="petName">Pet Name</span>
            <input type="text" className="form-control" />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Pet Type</span>
            <select name="pet-type" id="petType" className="form-select" value={selectedPetType} onChange={handlePetTypeChange}>
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
            </select>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Select Gender</span>
            <select className="form-select" name="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div className="d-flex mb-3">
          <div className="input-group me-3">
            <span className="input-group-text">Height</span>  
            <input type="text" className="form-control" />
          </div>
          <div className="input-group me-3">
            <span className="input-group-text">Weight</span>  
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Select Breed</span>
            <select className="form-select" name="breed" id="breed">
                {getBreedOptions()}
            </select>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Allergies</span>
            <textarea name="allergies" id="allergies" className="form-control" cols={30} rows={7}></textarea>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Vaccinations</span>
            <div className="form-check mb-3 me-3 ms-3">
                <input type="checkbox" className="form-check-input" id="rabies" />
                <label htmlFor="rabies" className="form-check-label">Rabies</label>
            </div>
            <div className="form-check mb-3 me-3 ms-3">
                <input type="checkbox" className="form-check-input" id="distemper" />
                <label htmlFor="distemper" className="form-check-label">Distemper</label>
            </div>
            <div className="form-check mb-3 me-3 ms-3">
                <input type="checkbox" className="form-check-input" id="parvovirus" />
                <label htmlFor="parvovirus" className="form-check-label">Parvovirus</label>
            </div>
            <div className="form-check mb-3 me-3 ms-3">
                <input type="checkbox" className="form-check-input" id="Hepatitis" />
                <label htmlFor="Hepatitis" className="form-check-label">Hepatitis</label>
            </div>
            <button className="btn btn-outline-dark mb-3 mt-3 rounded">
              <i className="bi bi-plus">+</i>
              <span>Add more pets</span>

            </button>

        </div>
        <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="terms" />
            <label htmlFor="terms" className="form-check-label">I agree to the Terms & Conditions
              <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#termsModal">
  View Terms & Conditions
</button>
            </label>
        </div>
<div className="modal fade" id="termsModal" tabIndex={-1} aria-labelledby="termsLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="termsLabel">Pet Hospital – Terms & Conditions</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <ol>
          <li>
            <strong>Medical Disclaimer:</strong>
            All veterinary treatments and advice are provided based on professional evaluation. The hospital does not guarantee specific results.
          </li>

          <li>
            <strong>Appointment Policy:</strong>
            Appointments must be booked in advance. Cancellations should be made at least 24 hours before the scheduled time.
          </li>

          <li>
            <strong>Payment Terms:</strong>
            All services must be paid in full at the time of treatment. Outstanding balances may result in suspension of services.
          </li>

          <li>
            <strong>Privacy Policy:</strong>
            Client and pet information will be kept confidential and will not be shared with third parties without consent.
          </li>

          <li>
            <strong>Emergency Liability:</strong>
            In emergencies, the hospital will take necessary steps to provide care but cannot be held responsible for unavoidable outcomes.
          </li>
        </ol>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>


        </div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-primary">Submit</button>
       </div>
        </div>
       </div>
       </div>
        </>
    )
}

export default RegistrationPage;