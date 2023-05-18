package com.hulk.magnit_phonenumber_database_service.entity;

import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
@SecondaryTable(name = "employee_images", pkJoinColumns = @PrimaryKeyJoinColumn(name = "id"))
public class Employee implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @UuidGenerator(style = UuidGenerator.Style.AUTO)
    private UUID id;

    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "boss_id")
    private UUID bossId;
    @Column(name = "department")
    private String department;

    @Column(name = "phonenumber")
    private String phonenumber;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "content_type", table = "employee_images")
    private String imageContentType;

    @Column(name = "image", table = "employee_images")
    private byte[] image;

    public Employee(EmployeeDTO employeeDTO) {
        this.id = employeeDTO.id();
        this.name = employeeDTO.name();
        this.surname = employeeDTO.surname();
        this.bossId = employeeDTO.bossId();
        this.department = employeeDTO.department();
        this.phonenumber = employeeDTO.phonenumber();
        this.email = employeeDTO.email();
        this.role = employeeDTO.role();
        this.imageContentType = employeeDTO.imageContentType();
        this.image = employeeDTO.image();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
