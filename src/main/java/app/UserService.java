package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerNewUserAccount(User user) throws UserAlreadyExistException {
        if (userNameExists(user.getUserName())) {
            throw new UserAlreadyExistException("Email address already exists: "
                    + user.getUserName());
        }

        User newUser = new User();
        newUser.setFirst_name(user.getFirst_name());
        newUser.setSurname(user.getSurname());
        newUser.setDate_of_birth(user.getDate_of_birth());
        newUser.setPhone_number(user.getPhone_number());
        newUser.setUserName(user.getUserName());
        newUser.setNationality(user.getNationality());
        newUser.setPpsn(user.getPpsn());
        newUser.setPassword(user.getPassword());
        newUser.setActive(true);
        newUser.setRole("ROLE_USER");

        return userRepository.save(newUser);
    }

    private boolean userNameExists(String userName) {
        return userRepository.findByUserName(userName).isPresent();
    }
}