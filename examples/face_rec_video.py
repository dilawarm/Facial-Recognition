import face_recognition
import os
import cv2
import pickle
import time

tol = 0.6 # The lower the tolerance, the lower the chance for false positives.
model = "cnn" # Better for training on the cpu. Can also use "cnn".
video = cv2.VideoCapture(0) # Using webcam. Can also substitute it with a file.

# Loading in the known faces
known_faces = []
known_identities = []

for id in os.listdir("known_faces"):
    for f in os.listdir(f"known_faces/{id}"):
        img_encoded = pickle.load(open(f"{id}/{f}", "rb"))
        known_faces.append(img_encoded)
        known_identities.append(int(id))

if len(known_identities) > 0:
    new_id = max(known_identities) + 1
else:
    new_id = 0

# Loading in the unkown faces
while True:
    r, img = video.read()
    height, width, channels = img.shape
    face_locs = face_recognition.face_locations(img, model=model)
    img_encodings = face_recognition.face_encodings(img, face_locs)

    for encoding, loc in zip(img_encodings, face_locs):
        res = face_recognition.compare_faces(known_faces, encoding, tol)
        match = None
        if True in res:
            match = known_identities[res.index(True)]
            print(f"Match = {match}")
        else:
            match = str(new_id)
            new_id += 1
            known_identities.append(match)
            known_faces.append(encoding)
            os.mkdir(f"known_faces/{match}")
            pickle.dump(encoding, open(f"known_faces/{match}/{match}-{int(time.time())}.pkl", "wb"))

        # Getting coordinates for drawing rectangle around the face.
        t_l = (loc[3], loc[0])
        b_r = (loc[1], loc[2])
        cv2.rectangle(img, t_l, b_r, [0, 255, 0], 3) # Green rectangle

        t_l = (loc[3], loc[2])
        b_r = (loc[1], loc[2]+22)
        cv2.rectangle(img, t_l, b_r, [0, 255, 0], cv2.FILLED)
        cv2.putText(img, match, (loc[3]+10, loc[2]+15),
                                    cv2.FONT_HERSHEY_SIMPLEX, 
                                    0.75, (0, 0, 0), 2)
    cv2.namedWindow('video',cv2.WINDOW_NORMAL)
    cv2.resizeWindow('video', width, height)
    cv2.imshow('video', img)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break