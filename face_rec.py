import face_recognition
import os
import cv2

tol = 0.6 # The lower the tolerance, the lower the chance for false positives.
model = "cnn" # Better for training on the cpu. Can also use "cnn".

# Loading in the known faces
known_faces = []
known_identities = []

for id in os.listdir("known_faces"):
    for f in os.listdir(f"known_faces/{id}"):
        img = face_recognition.load_image_file(f"known_faces/{id}/{f}")
        img_encoded = face_recognition.face_encodings(img)[0] # We assume that there is only one face of identity per image.
        known_faces.append(img_encoded)
        known_identities.append(id)

# Loading in the unkown faces
for f in os.listdir(f"unknown_faces"):
    print(f)
    img = face_recognition.load_image_file(f"unknown_faces/{f}")
    face_locs = face_recognition.face_locations(img, model=model)
    img_encodings = face_recognition.face_encodings(img, face_locs)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    for encoding, loc in zip(img_encodings, face_locs):
        res = face_recognition.compare_faces(known_faces, encoding, tol)
        match = None
        if True in res:
            match = known_identities[res.index(True)]
            print(f"Match = {match}")

            # Getting coordinates for drawing rectangle around the face.
            t_l = (loc[3], loc[0])
            b_r = (loc[1], loc[2])
            cv2.rectangle(img, t_l, b_r, [0, 255, 0], 3) # Green rectangle

            t_l = (loc[3], loc[2])
            b_r = (loc[1], loc[2]+22)
            cv2.rectangle(img, t_l, b_r, [0, 255, 0], cv2.FILLED)
            cv2.putText(img, match, (loc[3]+10, loc[3]+15),
                                     cv2.FONT_HERSHEY_SIMPLEX, 
                                     0.5, (200, 200, 200), 2)
    cv2.imshow(f, img)
    cv2.waitKey(10000)