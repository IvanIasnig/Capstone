package fitnessproject.ivaniasnig.images;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fitnessproject.ivaniasnig.user.User;
import fitnessproject.ivaniasnig.user.UserRepository;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

	@Autowired
	private UserRepository userRepo;
    
    public Image saveImage(MultipartFile file, UUID id) throws IOException {
    	
    	User user = userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
    	
        String name = file.getOriginalFilename();
        Image image = new Image(name, file.getBytes());
        image.setUser(user);
        
        user.getImages().add(image);
        return imageRepository.save(image);
    }

//    public Image getImage(UUID id) {
//        return imageRepository.findById(id).orElse(null);
//    }
}
